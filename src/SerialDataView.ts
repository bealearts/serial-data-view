
export default class SerialDataView {
  public position: i32 = 0;

  public static fromByteArray(bytes:Array<u8>):SerialDataView {
    const view = new SerialDataView(new ArrayBuffer(bytes.length));
    for (let i:i32=0; i<bytes.length; i++) {
      view.writeUint8(bytes[i]);
    }
    view.position = 0;
    return view;
  }

  public static fromUint8Array(bytes:Uint8Array):SerialDataView {
    const view = new SerialDataView(new ArrayBuffer(bytes.byteLength));
    for (let i:i32=0; i<bytes.length; i++) {
      view.writeUint8(bytes[i]);
    }
    view.position = 0;
    return view;
  }


  public constructor(
    buffer: ArrayBuffer,
    littleEndian: bool = false,
    byteOffset: i32 = 0,
    byteLength: i32 = buffer.byteLength
  ) {
    this.dataView = new DataView(buffer, byteOffset, byteLength);
    this.littleEndian = littleEndian;
  }

  public get buffer(): ArrayBuffer {
    return this.dataView.buffer;
  }

  public get byteLength(): i32 {
    return this.dataView.byteLength;
  }

  public toString(): string {
    const lookup:string = "0123456789ABCDEF";
    let result:string = '';
    for (let c:i32=0; c<this.dataView.byteLength; c++) {
      const val = this.dataView.getUint8(c);
      const hex = lookup.substr((val>>4), 1) + lookup.substr((val & 0x0F), 1);
      result += hex + ' ';
    }
    return result.trim();
  }

  /** Read **/

  public readFloat32(): f32 {
    return this.dataView.getFloat32(this.incOffset(4), this.littleEndian);
  }

  public readFloat64(): f64 {
    return this.dataView.getFloat64(this.incOffset(8), this.littleEndian);
  }

  public readInt8(): i8 {
    return this.dataView.getInt8(this.incOffset(1));
  }

  public readInt16(): i16 {
    return this.dataView.getInt16(this.incOffset(2), this.littleEndian);
  }

  public readInt32(): i32 {
    return this.dataView.getInt32(this.incOffset(4), this.littleEndian);
  }

  public readInt64(): i64 {
    return this.dataView.getInt64(this.incOffset(8), this.littleEndian);
  }

  public readUint8(): u8 {
    return this.dataView.getUint8(this.incOffset(1));
  }

  public readUint16(): u16 {
    return this.dataView.getUint16(this.incOffset(2), this.littleEndian);
  }

  public readUint32(): u32 {
    return this.dataView.getUint32(this.incOffset(4), this.littleEndian);
  }

  public readUint64(): u64 {
    return this.dataView.getUint64(this.incOffset(8), this.littleEndian);
  }


  /** Write **/

  public writeFloat32(value: f32): void {
    this.dataView.setFloat32(this.incOffset(4), value, this.littleEndian);
  }

  public writeFloat64(value: f64): void {
    this.dataView.setFloat64(this.incOffset(8), value, this.littleEndian);
  }

  public writeInt8(value: i8): void {
    this.dataView.setInt8(this.incOffset(1), value);
  }

  public writeInt16(value: i16): void {
    this.dataView.setInt16(this.incOffset(2), value, this.littleEndian);
  }

  public writeInt32(value: i32): void {
    this.dataView.setInt32(this.incOffset(4), value, this.littleEndian);
  }

  public writeInt64(value: i64): void {
    this.dataView.setInt64(this.incOffset(8), value, this.littleEndian);
  }

  public writeUint8(value: u8): void {
    this.dataView.setUint8(this.incOffset(1), value);
  }

  public writeUint16(value: i16): void {
    this.dataView.setUint16(this.incOffset(2), value, this.littleEndian);
  }

  public writeUint32(value: i32): void {
    this.dataView.setUint32(this.incOffset(4), value, this.littleEndian);
  }

  public writeUint64(value: i64): void {
    this.dataView.setUint64(this.incOffset(8), value, this.littleEndian);
  }

  private dataView: DataView;
  private littleEndian: bool;

  private incOffset(value: i32): i32 {
    const pos = this.position;
    this.position += value;
    return pos;
  }
}
