<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMedicalHistoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create health records');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'animal_id' => 'required|exists:animals,id',
            'type' => 'required|string|max:100',
            'description' => 'required|string',
            'date' => 'required|date|before_or_equal:today',
            'veterinarian_id' => 'required|exists:users,id',
            'cost' => 'required|numeric|min:0',
            'withdrawal_days' => 'required|integer|min:0',
            'release_date' => 'required|date|after_or_equal:date',
            'observations' => 'nullable|string',
        ];
    }
}
