<?php

namespace App\Http\Controllers\Reception;

use App\Exports\RegistrosRecepcionExport;
use App\Http\Controllers\Controller;
use App\Models\Count;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class receptionController extends Controller
{
    public function receiveData(Request $request)
    {
        try {
            $request->validate([
                '*.carga' => 'required|string|max:8',
                '*.zona' => 'required|string|max:5',
                '*.dama' => 'required|string|max:12',
                '*.pedido' => 'required|string|max:4',
                '*.caja' => 'required|string|max:5'
            ]);

            if (empty($request->all())) {
                return response()->json(['message' => 'El arreglo no puede estar vacío'], 422);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al procesar lista'], 422);
        }

        $objects = $request->all();

        foreach ($objects as $object) {
            Count::create($object);
        };

        return response()->json(['message' => 'Recepción completada'], 201);
    }

    public function exportData() {

        return Excel::download(new RegistrosRecepcionExport, 'registros_recepcion.xlsx');
        
    }

}
