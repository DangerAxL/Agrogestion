<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create supplies');
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100|unique:supplies',
            'type' => 'required|in:Sanitario,Alimenticio',
            'stock_current' => 'required|numeric|min:0',
            'unit' => 'required|string|max:20',
            'min_stock' => 'required|numeric|min:0',
        ];
    }
}
