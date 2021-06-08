
type Primitive = boolean | number | string | null

interface QueryObj {
  filename?:Primitive;
  width?:Primitive;
  heigth?: Primitive;
  extension?: Primitive;
}

interface ImgObj {
  filename?:string;
  width?:number;
  heigth?: number;
  extension?: string;
}
