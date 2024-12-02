import { getInputAsList, getInputAsString } from '../utils/input';

export abstract class Day {
  public readonly dayNumber: number;

  private _inputList: string[] | undefined;

  private _inputString: string | undefined;

  constructor(dayNumber: number) {
    this.dayNumber = dayNumber;
  }

  abstract partOne(): unknown;

  abstract partTwo(): unknown;

  protected get inputList(): string[] {
    if (this._inputList === undefined) {
      this._inputList = getInputAsList(this.dayNumber);
    }
    return this._inputList;
  }

  protected get inputString(): string {
    if (this._inputString === undefined) {
      this._inputString = getInputAsString(this.dayNumber);
    }
    return this._inputString;
  }
}
