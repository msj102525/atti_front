import Footer from '@/pages/common/Footer';
import Header from '@/pages/common/header';
import { useRouter } from 'next/router';

export default function ConsultAi() {
    const router = useRouter();
    const { model } = router.query;



    return (
        <div>
            <div className="flex flex-col items-center justify-between h-screen bg-gray-100">
                <div className="text-center p-4">
                    <p className="text-lg font-semibold">편하게 말해보세요!</p>
                    <p className="text-sm text-gray-700">여기서 말하는 고민은 누구에게도 들리지 않아요!</p>
                </div>
                <div className='flex-col items-center justify-center w-1/2 bg-gray-300'>
                    <div className="flex justify-between p-10">
                        <div>
                            <p className="text-base">내게 어떤 이야기를 들려줄건가?</p>
                        </div>
                        <div className='w-1/4'>
                            <img
                                src={`/philosopher/${model}.webp`}
                                alt="Philosopher"
                            />
                        </div>
                    </div>
                    <div className='justify-center items-center flex'>
                        <button className="mb-8 p-4 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 active:bg-red-700 focus:outline-none">
                            <span className="text-2xl">🎤</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>)
}