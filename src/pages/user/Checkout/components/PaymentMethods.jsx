import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'

const paymentMethods = [
  {
    id: 'bank_transfer',
    name: 'Transfer Bank',
    description: 'Pembayaran melalui transfer bank',
    icon: '🏦'
  },
  {
    id: 'ewallet',
    name: 'E-Wallet',
    description: 'Pembayaran melalui dompet digital',
    icon: '💳'
  },
]

export default function PaymentMethods({ value, onChange }) {
  const [selected, setSelected] = useState(value || paymentMethods[0].id)

  const handleChange = (value) => {
    setSelected(value)
    onChange?.(value)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-serif font-bold text-primary mb-6">
        Metode Pembayaran
      </h2>

      <RadioGroup value={selected} onChange={handleChange}>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <RadioGroup.Option
              key={method.id}
              value={method.id}
              className={({ active, checked }) =>
                `${
                  active ? 'ring-2 ring-primary/20' : ''
                } ${
                  checked ? 'bg-primary/5 border-primary' : 'bg-white border-gray-200'
                } relative flex cursor-pointer rounded-lg border p-4 focus:outline-none`
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-2xl mr-4">{method.icon}</div>
                      <div>
                        <RadioGroup.Label
                          as="p"
                          className="font-medium text-gray-900"
                        >
                          {method.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="text-sm text-gray-500"
                        >
                          {method.description}
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <CheckCircleIcon className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

PaymentMethods.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
} 