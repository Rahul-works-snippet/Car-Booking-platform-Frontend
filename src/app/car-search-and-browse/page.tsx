import type { Metadata } from 'next';
import CarSearchInteractive from './components/CarSearchInteractive';

export const metadata: Metadata = {
  title: 'Car Search and Browse - DriveEasy',
  description: 'Browse and filter available rental vehicles by location, date, category, price, and more. Find your perfect rental car today.',
};

export default function CarSearchAndBrowsePage() {
  return <CarSearchInteractive />;
}