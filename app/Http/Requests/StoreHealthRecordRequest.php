<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreHealthRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create health records');
    }

    public function rules(): array
    {
        return [
            'animal_id' => 'required|exists:animals,id',
            'disease' => 'required|string|max:100',
            'treatment' => 'nullable|string',
            'date' => 'required|date',
            'veterinarian_id' => 'required|exists:users,id',
            'withdrawal_days' => 'required|integer|min:0',
            'release_date' => 'required|date|after:date',
            'observations' => 'nullable|string',
        ];
    }
}
