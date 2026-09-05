import { useState } from 'react'
import useFetch from '../hooks/useFetch.js'
import { useToast } from '../hooks/useToast.js'
import usePageTitle from '../hooks/usePageTitle.js'
import Button from '../components/ui/Button.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import ErrorState from '../components/common/ErrorState.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import Modal from '../components/common/Modal.jsx'
import ConfirmDialog from '../components/common/ConfirmDialog.jsx'
import ReviewForm from '../components/admin/ReviewForm.jsx'
import {
  getAllReviewsAdmin,
  createReviewAdmin,
  updateReviewAdmin,
  deleteReviewAdmin,
  toggleReviewPublished,
} from '../services/adminService.js'

/**
 * ReviewManagement (spec section 37 -- "Admin should control
 * publication"). Not part of the MVP (spec section 84), added afterward
 * alongside Settings.
 */
function ReviewManagement() {
  usePageTitle('Review Management')

  const { showToast } = useToast()
  const { data: reviews, error, isLoading, refetch } = useFetch(getAllReviewsAdmin, [])

  const [formOpen, setFormOpen] = useState(false)
  const [editingReview, setEditingReview] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  function openCreateForm() {
    setEditingReview(null)
    setFormOpen(true)
  }

  function openEditForm(review) {
    setEditingReview(review)
    setFormOpen(true)
  }

  async function handleSubmit(values) {
    setIsSaving(true)
    try {
      const payload = {
        customerName: values.customerName,
        rating: values.rating,
        comment: values.comment,
        isPublished: values.isPublished,
      }

      if (editingReview) {
        await updateReviewAdmin(editingReview.id, payload)
        showToast('Review updated successfully.')
      } else {
        await createReviewAdmin(payload)
        showToast('Review created successfully.')
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
      await deleteReviewAdmin(deleteTarget.id)
      showToast('Review deleted successfully.')
      setDeleteTarget(null)
      refetch()
    } catch (err) {
      showToast(err.message || 'Failed to delete review.', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  async function handleTogglePublished(review) {
    try {
      await toggleReviewPublished(review.id, !review.isPublished)
      refetch()
    } catch (err) {
      showToast(err.message || 'Failed to update review.', 'error')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1>Review Management</h1>
        <Button variant="primary" onClick={openCreateForm}>
          + Add Review
        </Button>
      </div>

      {isLoading && <LoadingState label="Loading reviews…" />}
      {error && <ErrorState title="Unable to load reviews." onRetry={refetch} />}
      {reviews && reviews.length === 0 && (
        <EmptyState
          title="No reviews available."
          description="Add a review to feature it on the homepage."
        />
      )}

      {reviews && reviews.length > 0 && (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-card bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-dark">{review.customerName}</p>
                  <p className="text-sm text-accent-dark">{'★'.repeat(review.rating)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePublished(review)}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    review.isPublished
                      ? 'bg-coffee/10 text-coffee'
                      : 'bg-dark/5 text-dark/40'
                  }`}
                >
                  {review.isPublished ? 'Published' : 'Unpublished'}
                </button>
              </div>
              <p className="mt-2 text-sm text-dark/70">{review.comment}</p>
              <div className="mt-3 flex gap-3">
                <Button variant="ghost" size="sm" onClick={() => openEditForm(review)}>
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTarget(review)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingReview ? 'Edit Review' : 'Add Review'}
      >
        <ReviewForm
          initialValues={editingReview}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
          isSubmitting={isSaving}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this review?"
        description="Are you sure you want to delete this review? This action cannot be undone."
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  )
}

export default ReviewManagement
