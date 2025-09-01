import { ArrowRight } from 'lucide-react';

export default function Homepage() {
  return (
    <div className="font-sans">
      <div className="px-4 xl:py-12 py-3 md:px-8 lg:px-16 md:py-20 lg:py-24">
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex justify-center md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 leading-tight">
              Luck isn't made,
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                it's engineered
              </span>
            </h1>
          </div>

          <div className="w-full flex justify-center md:w-1/2 md:pl-8">
            <div className="max-w-lg p-2">
              <p className="text-2xl md:text-2xl font-medium text-gray-700 mb-8">
                We back founders building iconic companies that transcend boundaries. We invest directly in their growth to make them unbreakable.
              </p>
              <div className="flex justify-center items-center">
                <button className="flex items-center text-gray-700 font-medium hover:text-gray-900">
                  READ MORE
                  <span className="ml-4 p-3 border border-gray-300 rounded-full">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}