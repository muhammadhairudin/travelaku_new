import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Container from '../../../components/common/Container'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { ClockIcon } from '@heroicons/react/24/outline'
import TransactionCard from './components/TransactionCard'
import { fetchTransactions } from '../../../store/slices/transactionSlice'

export default function Transactions() {
  const dispatch = useDispatch()
  const { transactions, isLoading, error } = useSelector((state) => state.transaction)

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <Container className="py-12">
      <div className="flex items-center gap-3 mb-8">
        <ClockIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
          Riwayat Transaksi
        </h1>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            Belum ada transaksi
          </p>
          <Link to="/activities" className="btn btn-primary">
            Jelajahi Aktivitas
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {transactions.map((transaction) => (
            <TransactionCard 
              key={transaction.id} 
              transaction={transaction} 
            />
          ))}
        </div>
      )}
    </Container>
  )
} 