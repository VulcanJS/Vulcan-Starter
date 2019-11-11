export const statuses = {
  pending: 1,
  approved: 2,
  rejected: 3,
  spam: 4,
  deleted: 5,
  scheduled: 6,
};

export const statusesReverse = {
  1: 'pending',
  2: 'approved',
  3: 'rejected',
  4: 'span',
  5: 'deleted',
  6: 'scheduled',
};

export const statusesOptions = [
  {
    value: 1,
    label: 'Pending',
    description: 'Item has not yet been approved.',
  },
  {
    value: 2,
    label: 'Approved',
    description: 'Item has been approved.',
  },
  {
    value: 3,
    label: 'Rejected',
    description: 'Item has been rejected.',
  },
  {
    value: 4,
    label: 'Spam',
    description: 'Item has been marked as spam.',
  },
  {
    value: 5,
    label: 'Deleted',
    description: 'Item has been deleted.',
  },
  {
    value: 6,
    label: 'Scheduled',
    description: 'Item has been scheduled for future publication.',
  },
];

export const postViews = [
  {
    name: 'posts.top',
    sort: 'score',
    path: '/',
  },
  {
    name: 'posts.best',
    sort: 'baseScore',
    path: '/best',
  },
  {
    name: 'posts.new',
    sort: 'postedAt',
    path: '/new',
  },
];
