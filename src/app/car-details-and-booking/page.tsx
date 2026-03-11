import type { Metadata } from 'next';
import CarDetailsInteractive from './components/CarDetailsInteractive';

export const metadata: Metadata = {
  title: 'Car Details & Booking - DriveEasy',
  description: 'View comprehensive vehicle details and complete your car rental reservation with dynamic pricing, insurance options, and additional services.',
};

export default function CarDetailsAndBookingPage() {
  return <CarDetailsInteractive />;
}