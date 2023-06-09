const hondaCB600f = 'Honda Cb 600f Hornet';
const newMotorcycleInput = {
  model: hondaCB600f,
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const newMotorcycleOutput = {
  id: '6348513f34c397abcad040b2',
  model: hondaCB600f,
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const getAllMotorcyclesOutput = [
  {
    id: '634852326b35b59438fbea2f',
    model: hondaCB600f,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Honda Cbr 1000rr',
    year: 2011,
    color: 'Orange',
    status: true,
    buyValue: 59.900,
    category: 'Street',
    engineCapacity: 1000,
  },
];

const getByIdMotorcycleOutput = {
  id: '634852326b35b59438fbea31',
  model: 'Honda Cbr 1000rr',
  year: 2011,
  color: 'Orange',
  status: true,
  buyValue: 59.900,
  category: 'Street',
  engineCapacity: 1000,
};

const dataMotorcycleForEditing = {
  id: '634852326b35b59438fbea31',
  model: 'Honda Cbr 1000',
  year: 2011,
  color: 'Orange',
  status: true,
  buyValue: 59.900,
  category: 'Street',
  engineCapacity: 1000,
};

const newDataMotorcycle = {
  model: 'teste01',
  year: 2014,
  color: 'Red',
  status: true,
  buyValue: 45.000,
  category: 'Street',
  engineCapacity: 600,
};

const resultEditDataMotorcycle = {
  id: '634852326b35b59438fbea2f',
  model: 'Honda Cb 600f Hornet',
  year: 2014,
  color: 'Red',
  status: true,
  buyValue: 45.000,
  category: 'Street',
  engineCapacity: 600,
};

const findDelete = {
  id: '644c3d8b3d1267845f9f026b',
  model: 'Honda1',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30,
  category: 'Street',
  engineCapacity: 600,
};

const arrayNull = [null, null, null];

export {
  newMotorcycleOutput,
  newMotorcycleInput,
  getAllMotorcyclesOutput,
  getByIdMotorcycleOutput,
  dataMotorcycleForEditing,
  newDataMotorcycle,
  resultEditDataMotorcycle,
  findDelete,
  arrayNull,
};