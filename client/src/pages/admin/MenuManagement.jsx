import { useState } from 'react'
import useFetch from '../../hooks/useFetch.js'
import { useToast } from '../../hooks/useToast.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import Button from '../../components/ui/Button.jsx'
import LoadingState from '../../components/common/LoadingState.jsx'
import ErrorState from '../../components/common/ErrorState.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import Modal from '../../components/common/Modal.jsx'
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx'
import MenuItemForm from '../../components/admin/MenuItemForm.jsx'
import { getCategories } from '../../services/categoryService.js'
import {
  getAllMenuItemsAdmin,
  createMenuItemAdmin,
  updateMenuItemAdmin,
  deleteMenuItemAdmin,
  toggleMenuItemFeatured,
  toggleMenuItemAvailability,
} from '../../services/adminService.js'

/**
 * MenuManagement (spec section 46). Full CRUD, plus one-click toggles for
 * featured/available so admins don't need to open the edit form for those.
 */
function MenuManagement() {
  usePageTitle('Menu Management')

  const { showToast } = useToast()
  const {
    data: items,
    error,
    isLoading,
    refetch,
  } = useFetch(getAllMenuItemsAdmin, [])
  const { data: categories } = useFetch(getCategories, [])

  const [formOpen, setFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  function openCreateForm() {
    setEditingItem(null)
    setFormOpen(true)
  }

  function openEditForm(item) {
    setEditingItem({
      ...item,
      categoryId: item.category?.id ?? item.categoryId,
      price: String(item.price),
    })
    setFormOpen(true)
  }

  async function handleSubmit(values) {
    setIsSaving(true)
    try {
      const payload = {
        name: values.name,
        description: values.description,
        price: values.price,
        categoryId: values.categoryId,
        imageUrl: values.imageUrl,
        isFeatured: values.isFeatured,
        isAvailable: values.isAvailable,
      }

      if (editingItem) {
        await updateMenuItemAdmin(editingItem.id, payload)
        showToast('Menu item updated successfully.')
      } else {
        await createMenuItemAdmin(payload)
        showToast('Menu item created successfully.')
      }

      setFormOpen(false)
      refetch()
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDeleteConfirmed() {
    setIsDeleting(true)
    try {
      await deleteMenuItemAdmin(deleteTarget.id)
      showToast('Menu item deleted successfully.')
      setDeleteTarget(null)
      refetch()
    } catch (err) {
      showToast(err.message || 'Failed to delete item.', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  async function handleToggleFeatured(item) {
    try {
      await toggleMenuItemFeatured(item.id, !item.isFeatured)
      refetch()
    } catch (err) {
      showToast(err.message || 'Failed to update item.', 'error')
    }
  }

  async function handleToggleAvailability(item) {
    try {
      await toggleMenuItemAvailability(item.id, !item.isAvailable)
      refetch()
    } catch (err) {
      showToast(err.message || 'Failed to update item.', 'error')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1>Menu Management</h1>
        <Button variant="primary" onClick={openCreateForm}>
          + Add Item
        </Button>
      </div>

      {isLoading && <LoadingState label="Loading menu items…" />}
      {error && (
        <ErrorState title="Unable to load menu items." onRetry={refetch} />
      )}
      {items && items.length === 0 && (
        <EmptyState
          title="No menu items found."
          description="Add your first item to get started."
        />
      )}

      {items && items.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-card bg-white shadow-soft md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-dark/10 text-xs uppercase tracking-wide text-dark/50">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Featured</th>
                  <th className="px-4 py-3">Available</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-dark/5 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <span className="font-medium text-dark">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-dark/70">{item.categoryName}</td>
                    <td className="px-4 py-3 text-dark/70">₱{item.price}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(item)}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.isFeatured
                            ? 'bg-accent/20 text-accent-dark'
                            : 'bg-dark/5 text-dark/40'
                        }`}
                      >
                        {item.isFeatured ? 'Featured' : 'Not Featured'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggleAvailability(item)}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.isAvailable
                            ? 'bg-coffee/10 text-coffee'
                            : 'bg-dark/5 text-dark/40'
                        }`}
                      >
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditForm(item)}>
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteTarget(item)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-4 md:hidden">
            {items.map((item) => (
              <div key={item.id} className="rounded-card bg-white p-4 shadow-soft">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-dark">{item.name}</p>
                    <p className="text-sm text-dark/60">
                      {item.categoryName} · ₱{item.price}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(item)}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.isFeatured
                        ? 'bg-accent/20 text-accent-dark'
                        : 'bg-dark/5 text-dark/40'
                    }`}
                  >
                    {item.isFeatured ? 'Featured' : 'Not Featured'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleAvailability(item)}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.isAvailable
                        ? 'bg-coffee/10 text-coffee'
                        : 'bg-dark/5 text-dark/40'
                    }`}
                  >
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </button>
                </div>
                <div className="mt-3 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditForm(item)}
                    className="flex-1 justify-center"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteTarget(item)}
                    className="flex-1 justify-center text-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
      >
        <MenuItemForm
          initialValues={editingItem}
          categories={categories ?? []}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
          isSubmitting={isSaving}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this menu item?"
        description="Are you sure you want to delete this menu item? This action cannot be undone."
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  )
}

export default MenuManagement
