<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Count extends Model
{
    use HasFactory;

    protected $table = 'registros_recepcion';

    protected $primaryKey = 'id';

    protected $fillable = [
        'carga',
        'zona',
        'dama',
        'pedido',
        'caja'
    ];
}
