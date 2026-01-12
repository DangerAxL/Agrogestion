<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BreedsExport implements FromCollection, WithHeadings
{
    protected $breedsByLot;

    public function __construct(Collection $breedsByLot)
    {
        $this->breedsByLot = $breedsByLot;
    }

    public function collection()
    {
        $data = [];

        foreach ($this->breedsByLot as $lotName => $breeds) {
            foreach ($breeds as $breedName => $count) {
                $data[] = [
                    'Lote' => $lotName,
                    'Raza' => $breedName,
                    'Cantidad' => $count,
                ];
            }
        }

        return collect($data);
    }

    public function headings(): array
    {
        return [
            'Lote',
            'Raza',
            'Cantidad',
        ];
    }
}
