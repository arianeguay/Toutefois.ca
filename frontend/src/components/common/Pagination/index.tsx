import React, { useMemo } from 'react';
import Button from '../Button';
import { LimitSelect, PageNumber, PaginationContainer } from './styles';

type LimitSelection = {
  start?: number; // first page size (e.g., 8)
  end?: number; // last page size (e.g., 54)
  jump?: number; // step between sizes (e.g., 8)
};

const defaultLimitSelection: Required<LimitSelection> = {
  start: 8,
  end: 54,
  jump: 8,
};

interface PaginationProps {
  page: number; // 1-based
  limit: number; // items per page
  total: number; // total items
  handlePageChange: (page: number, limit?: number) => void;
  limitSelection?: LimitSelection; // { start, end, jump }
  maxButtons?: number; // how many numbered buttons to show
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function makeWindow(totalPages: number, current: number, maxButtons: number) {
  // Returns an array like [1, '…', 4, 5, 6, 7, 8, '…', 42]
  if (totalPages <= maxButtons) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | string)[] = [];
  const siblings = Math.max(1, Math.floor((maxButtons - 5) / 2)); // keep 1, last, and two ellipses
  const left = clamp(current - siblings, 2, totalPages - 1);
  const right = clamp(current + siblings, 2, totalPages - 1);

  pages.push(1);
  if (left > 2) pages.push('…');

  for (let p = left; p <= right; p++) pages.push(p);

  if (right < totalPages - 1) pages.push('…');
  pages.push(totalPages);

  // Ensure current included if near edges
  if (!pages.includes(current)) {
    // Replace first middle with current if necessary
    const idx = pages.findIndex(
      (v) => typeof v === 'number' && v !== 1 && v !== totalPages,
    );
    if (idx !== -1) pages[idx] = current;
  }
  // Remove duplicates and sort numbers while keeping ellipses order
  const seen = new Set();
  return pages.filter((v) => (v === '…' ? true : !seen.has(v) && seen.add(v)));
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  total,
  handlePageChange,
  limitSelection = defaultLimitSelection,
  maxButtons = 9,
}) => {
  const current = clamp(page || 1, 1, total);

  const pagesToRender = useMemo(
    () => makeWindow(total, current, Math.max(5, maxButtons)),
    [total, current, maxButtons],
  );

  const { start, end, jump } = { ...defaultLimitSelection, ...limitSelection };
  const limitOptions = useMemo(() => {
    const opts: number[] = [];
    for (let v = start; v <= end; v += jump) opts.push(v);
    // Ensure current limit is in the list (if passed from outside)
    if (!opts.includes(limit)) opts.push(limit);
    return opts.sort((a, b) => a - b);
  }, [start, end, jump, limit]);

  const goTo = (p: number) => {
    const next = clamp(p, 1, total);
    if (next !== current) handlePageChange(next, limit);
  };

  const onLimitChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newLimit = Number(e.target.value);
    // Keep the first item of current page in view when changing limit
    const firstIndex = (current - 1) * limit + 1;
    const newPage = clamp(
      Math.ceil(firstIndex / newLimit),
      1,
      Math.max(1, Math.ceil(total / newLimit)),
    );
    handlePageChange(newPage, newLimit);
  };

  // Hide pagination if only one page
  if (total <= 1) {
    return null;
  }

  return (
    <PaginationContainer role="navigation" aria-label="Pagination">
      <Button
        onClick={() => goTo(current - 1)}
        disabled={current <= 1}
        aria-label="Previous page"
      >
        Précédent
      </Button>

      {pagesToRender.map((p, i) =>
        p === '…' ? (
          <PageNumber
            key={`ellipsis-${i}`}
            aria-hidden="true"
            style={{ padding: '0 0.25rem' }}
          >
            …
          </PageNumber>
        ) : (
          <PageNumber
            as="button"
            key={p}
            $active={p === current}
            aria-current={p === current ? 'page' : undefined}
            onClick={() => goTo(p as number)}
          >
            {p}
          </PageNumber>
        ),
      )}

      <Button
        onClick={() => goTo(current + 1)}
        disabled={current >= total}
        aria-label="Next page"
      >
        Suivant
      </Button>

      <label style={{ marginLeft: 8 }}>
        Items per page{' '}
        <LimitSelect value={limit} onChange={onLimitChange}>
          {limitOptions.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </LimitSelect>
      </label>
    </PaginationContainer>
  );
};

export default Pagination;
