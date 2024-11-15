import PropTypes from 'prop-types'
import { useState } from 'react'
import { EyeIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function TransactionTable({ transactions }) {
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const handleApprove = async (transactionId) => {
    try {
      // Implementasi approve transaksi
      console.log('Approve transaction:', transactionId)
    } catch (err) {
      console.error('Failed to approve transaction:', err)
    }
  }

  const handleReject = async (transactionId) => {
    try {
      // Implementasi reject transaksi
      console.log('Reject transaction:', transactionId)
    } catch (err) {
      console.error('Failed to reject transaction:', err)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Transaksi Terbaru
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Transaksi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pengguna
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.user?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Rp {transaction.amount?.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : transaction.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.createdAt).toLocaleDateString('id-ID')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedTransaction(transaction)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Lihat Detail"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    {transaction.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(transaction.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Setujui"
                        >
                          <CheckIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleReject(transaction.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Tolak"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setSelectedTransaction(null)} />

            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Detail Transaksi
                </h3>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Transaction Info */}
                <div>
                  <h4 className="font-medium text-gray-900">Informasi Transaksi</h4>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">ID Transaksi</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTransaction.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        selectedTransaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : selectedTransaction.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedTransaction.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-sm font-medium text-gray-900">
                        Rp {selectedTransaction.amount?.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tanggal</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedTransaction.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Proof */}
                {selectedTransaction.paymentProof && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Bukti Pembayaran</h4>
                    <img
                      src={selectedTransaction.paymentProof}
                      alt="Bukti Pembayaran"
                      className="w-full max-h-96 object-contain rounded-lg"
                    />
                  </div>
                )}

                {/* Actions */}
                {selectedTransaction.status === 'pending' && (
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => {
                        handleReject(selectedTransaction.id)
                        setSelectedTransaction(null)
                      }}
                      className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                    >
                      Tolak
                    </button>
                    <button
                      onClick={() => {
                        handleApprove(selectedTransaction.id)
                        setSelectedTransaction(null)
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                    >
                      Setujui
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      amount: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      paymentProof: PropTypes.string,
    })
  ).isRequired,
} 