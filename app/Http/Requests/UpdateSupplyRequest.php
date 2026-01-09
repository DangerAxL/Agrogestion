<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSupplyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('edit supplies');
    }

    public function rules(): array
    {
        $supplyId = $this->route('supply')->id ?? null;

        return [
            'name' => 'sometimes|required|string|max:100|unique:supplies,name,'.$supplyId,
            'type' => 'sometimes|required|in:Sanitario,Alimenticio',
            'stock_current' => 'sometimes|required|numeric|min:0',
            'unit' => 'sometimes|required|string|max:20',
            'min_stock' => 'sometimes|required|numeric|min:0',
        ];
    }
}
