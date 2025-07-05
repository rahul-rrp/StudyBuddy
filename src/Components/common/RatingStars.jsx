import React, { useMemo } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

const RatingStars = ({ Review_Count = 0, Star_Size = 20 }) => {
  // Memoize calculation to avoid unnecessary re-renders
  const { full, half, empty } = useMemo(() => {
    const clampedRating = Math.min(Math.max(Review_Count, 0), 5) // Clamp between 0–5
    const fullStars = Math.floor(clampedRating)
    const hasHalfStar = clampedRating - fullStars >= 0.25 && clampedRating - fullStars < 0.75 ? 1 : 0
    const emptyStars = 5 - fullStars - hasHalfStar
    return {
      full: fullStars,
      half: hasHalfStar,
      empty: emptyStars,
    }
  }, [Review_Count])

  return (
    <div className="flex gap-1 text-yellow-400">
      {Array.from({ length: full }, (_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={Star_Size} />
      ))}
      {Array.from({ length: half }, (_, i) => (
        <TiStarHalfOutline key={`half-${i}`} size={Star_Size} />
      ))}
      {Array.from({ length: empty }, (_, i) => (
        <TiStarOutline key={`empty-${i}`} size={Star_Size} />
      ))}
    </div>
  )
}

export default RatingStars
