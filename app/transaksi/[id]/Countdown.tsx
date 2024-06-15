"use client"

import React, { useState, useEffect } from 'react';

interface CountdownProps {
    targetDate: string;
    status: string
}

interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, status }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: TimeLeft = { hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        if (status == "pending") {

            const timer = setTimeout(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);

            return () => clearTimeout(timer);
        }
    });

    return (
        <section>
            <div className='text-center text-white'>
                <b className='text-xl'>
                    {
                        status != "pending" || (timeLeft.hours + timeLeft.seconds + timeLeft.minutes == 0) ? "Transaksi sudah selesai." : "Harap Lengkapi Pembayaran"
                    }

                </b>
                <p className='mt-4 mb-2'>Pesanan ini akan hangus pada</p>
            </div>
            <div className='flex gap-5 w-full justify-center'>
                <div className='border-2 boder-white rounded-2xl flex flex-col gap-2 p-4 text-center min-w-24'>
                    <span className='text-primary text-6xl'>{status == "pending" ? timeLeft.hours : "0"}</span>
                    <span className='text-white font-semibold'>Jam</span>
                </div>
                <div className='border-2 boder-white rounded-2xl flex flex-col gap-2 p-4 text-center min-w-24'>
                    <span className='text-primary text-6xl'>{status == "pending" ? timeLeft.minutes : "0"}</span>
                    <span className='text-white font-semibold'>Menit</span>
                </div>
                <div className='border-2 boder-white rounded-2xl flex flex-col gap-2 p-4 text-center min-w-24'>
                    <span className='text-primary text-6xl'>{status == "pending" ? timeLeft.seconds : "0"}</span>
                    <span className='text-white font-semibold'>Detik</span>
                </div>
            </div>
        </section>
    )
};

export default Countdown;
