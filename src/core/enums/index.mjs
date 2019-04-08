const TASK_CONSUMER = {
  parser: 'parse-worker',
  scanner: 'scan-worker',
};

const TASK_STATUS = {
  open: 'open',
  inProgress: 'in-progress',
  success: 'success',
  fail: 'fail',
};

const FEATURES = {
  furniture: 'furniture',
  kitchenFurniture: 'kitchen-furniture',
  stove: 'stove',
  fridge: 'fridge',
  washer: 'washer',
  tv: 'tv',
  internet: 'internet',
  balcony: 'balcony',
  conditioning: 'conditioning',
};

export {FEATURES, TASK_CONSUMER, TASK_STATUS};
