<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHealthRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('edit health records');
    }

    public function rules(): array
    {
        return [
            'animal_id' => 'sometimes|required|exists:animals,id',
            'disease' => 'sometimes|required|string|max:100',
            'treatment' => 'nullable|string',
            'date' => 'sometimes|required|date',
            'veterinarian_id' => 'sometimes|required|exists:users,id',
            'withdrawal_days' => 'sometimes|required|integer|min:0',
            'release_date' => 'sometimes|required|date|after:date',
            'observations' => 'nullable|string',
        ];
    }
}
