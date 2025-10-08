from marshmallow import Schema, fields, validate

class DepartamentoSchema(Schema):
    """Schema para validar datos de Departamento"""
    id = fields.Int(dump_only=True)
    nombre = fields.Str(required=True, validate=validate.Length(min=1))
    descripcion = fields.Str(required=False, allow_none=True)
    creado_en = fields.DateTime(dump_only=True)
    actualizado_en = fields.DateTime(dump_only=True)

class DepartamentoCreateSchema(Schema):
    """Schema para crear departamentos"""
    nombre = fields.Str(required=True, validate=validate.Length(min=1))
    descripcion = fields.Str(required=False, allow_none=True)


class PosicionSchema(Schema):
    """Schema para validar datos de Posición"""
    id = fields.Int(dump_only=True)
    titulo = fields.Str(required=True, validate=validate.Length(min=1))
    descripcion = fields.Str(required=False, allow_none=True)
    salario_min = fields.Decimal(required=False, allow_none=True)
    salario_max = fields.Decimal(required=False, allow_none=True)
    creado_en = fields.DateTime(dump_only=True)
    actualizado_en = fields.DateTime(dump_only=True)

class PosicionCreateSchema(Schema):
    """Schema para crear posiciones"""
    titulo = fields.Str(required=True, validate=validate.Length(min=1))
    descripcion = fields.Str(required=False, allow_none=True)
    salario_min = fields.Decimal(required=False, allow_none=True)
    salario_max = fields.Decimal(required=False, allow_none=True)