<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AnimalsExport implements FromCollection, WithHeadings
{
    protected $animals;

    public function __construct(Collection $animals)
    {
        $this->animals = $animals;
    }

    public function collection()
    {
        return $this->animals->map(function ($animal) {
            return [
                'Caravana' => $animal->caravana,
                'Raza' => $animal->breed->name ?? '',
                'Lote' => $animal->lot->name ?? '',
                'Peso Entrada' => $animal->weight_entry,
                'Peso Actual' => $animal->weight_current,
                'Estado' => $animal->status,
                'Activo' => $animal->active ? 'Sí' : 'No',
                'Fecha Entrada' => $animal->entry_date?->format('d/m/Y'),
                'Fecha Retiro' => $animal->withdrawal_date?->format('d/m/Y'),
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Caravana',
            'Raza',
            'Lote',
            'Peso Entrada',
            'Peso Actual',
            'Estado',
            'Activo',
            'Fecha Entrada',
            'Fecha Retiro',
        ];
    }
}
