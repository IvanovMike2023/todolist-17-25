import s from './Pagination.module.css'
import {getPaginationPages} from "@/common/utils";

type Props = {
    currentPage: number
    setCurrentPage: (page: number) => void
    count: number
    pageSize: number
}

export const Pagination = ({currentPage, setCurrentPage, count,pageSize}: Props) => {
    if (count <= 1) return null
    const pages = getPaginationPages(currentPage,count)
    return (
        <div className={s.container}>
        <div className={s.pagination}>
            {pages.map((page, idx) =>
                    page === '...' ? (
                        <span className={s.ellipsis} key={`ellipsis-${idx}`}>
            ...
          </span>
                    ) : (
                        <button
                            key={page}
                            className={
                                page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton
                            }
                            onClick={() => page !== currentPage && setCurrentPage(Number(page))}
                            disabled={page === currentPage}
                            type="button"
                        >
                            {page}
                        </button>
                    )
            )}
        </div>

        </div>
    )
}