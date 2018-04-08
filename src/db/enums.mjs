const taskConsumer = {
  parser: 'parse-worker',
  scanner: 'scan-worker',
};

const taskStatus = {
  open: 'open',
  inProgress: 'in-progress',
  success: 'success',
  fail: 'fail',
};

const features = {
  furniture: 'furniture',
  kitchenFurniture: 'kitchenFurniture',
  stove: 'stove',
  fridge: 'fridge',
  washer: 'washer',
  tv: 'tv',
  internet: 'internet',
  balcony: 'balcony',
  conditioning: 'conditioning',
};

export {taskConsumer, taskStatus, features};
