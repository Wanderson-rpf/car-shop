import { Model, Schema, UpdateQuery, model, models } from 'mongoose';

export default abstract class AbstractODM<T> {
  private _schema: Schema;
  private _model: Model<T>;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this._schema = schema;
    this.modelName = modelName;
    this._model = models[this.modelName] || model(this.modelName, this._schema);
  }

  public async create(vehicle: T): Promise<T> {
    return this._model.create({ ...vehicle });
  }

  public async getAll(): Promise<T[]> {
    return this._model.find({});
  }

  public async getById(id: string): Promise<T[]> {
    return this._model.find(
      { _id: id },
      { __v: false },
    );
  }

  public async edit(id: string, newValue: Partial<T>): Promise<T | null> {
    return this._model.findByIdAndUpdate(
      { _id: id },
      { ...newValue } as UpdateQuery<T>,
      { new: true, select: { __v: false } },
    );
  }
}