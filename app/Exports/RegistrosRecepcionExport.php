<?php

namespace App\Exports;

use App\Models\Count;
use Maatwebsite\Excel\Concerns\FromCollection;

class RegistrosRecepcionExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Count::all();
    }
}
