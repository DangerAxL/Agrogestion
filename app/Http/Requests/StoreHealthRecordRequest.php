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
            'type' => 'required|string|max:100',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'veterinarian_id' => 'required|exists:users,id',
            'cost' => 'nullable|numeric|min:0',
            'withdrawal_days' => 'nullable|integer|min:0',
            'release_date' => 'nullable|date|after:date',
            'observations' => 'nullable|string',
        ];
    }
}
