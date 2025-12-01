import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Microservices App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/products" className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Products &rarr;</h2>
          <p className="text-gray-600">Manage your product inventory.</p>
        </Link>
        <Link href="/sales" className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Sales &rarr;</h2>
          <p className="text-gray-600">Record and view sales transactions.</p>
        </Link>
      </div>
    </main>
  );
}
