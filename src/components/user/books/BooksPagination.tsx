import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

type Props = {
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
}

export function BooksPagination({ currentPage, totalPages, goToPage }: Props) {
  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (page) =>
      page === 1 ||
      page === totalPages ||
      Math.abs(page - currentPage) <= 1
  )

  return (
    <Pagination className="mb-5">
      <PaginationContent className="flex gap-2">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => goToPage(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {visiblePages.map((page, idx) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={() => goToPage(page)}
            >
              {page}
            </PaginationLink>
            {idx < visiblePages.length - 1 &&
              visiblePages[idx + 1] - page > 1 && (
                <span className="px-1 text-gray-400">...</span>
              )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => goToPage(currentPage + 1)}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
