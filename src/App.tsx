import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming Clock.css contains the necessary styles

function App() {
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(true);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const setTime = (flip: boolean) => {
    // const t = new Date();
    // updateGroup('hour', t.getHours(), flip);
    // updateGroup('min', t.getMinutes(), flip);
    // updateGroup('sec', t.getSeconds(), flip);
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(20, 0, 0, 0); // Set target time to 8 PM

    let diff = Math.max(targetTime.getTime() - now.getTime(), 0);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 1000 * 60;
    const seconds = Math.floor(diff / 1000);

    updateGroup('hour', hours, false);
    updateGroup('min', minutes, false);
    updateGroup('sec', seconds, true);
  };

  const flipTo = (digit: HTMLElement, n: string) => {
    const current = digit.dataset['num'];
    digit.dataset['num'] = n;
    // digit.querySelector('.front').dataset['content'] = current;
    const frontElement = digit.querySelector('.front') as HTMLElement | null;
    if (frontElement) {
      frontElement.dataset['content'] = current;
    }
    const backElement = digit.querySelector('.back') as HTMLElement | null;
    if (backElement) {
      backElement.dataset['content'] = n;
    }

    const underElement = digit.querySelector('.under') as HTMLElement | null;
    if (underElement) {
      underElement.dataset['content'] = n;
    }

    digit.querySelectorAll('.flap').forEach((ele: Element) => {
      (ele as HTMLElement).style.display = 'block';
    });

    setTimeout(() => {
      const baseElement = digit.querySelector('.base') as HTMLElement | null;
      if (baseElement) {
        baseElement.innerText = n;
      }

      digit.querySelectorAll('.flap').forEach((ele: Element) => {
        const flapElement = ele as HTMLElement;
        flapElement.style.display = 'none';
      });
    }, 350);
  };

  const jumpTo = (digit: HTMLElement, n: string) => {
    digit.dataset['num'] = n;
    (digit.querySelector('.base') as HTMLElement).innerText = n;
  };

  const updateGroup = (group: string, n: number, flip: boolean) => {
    const digit1 = document.querySelector<HTMLElement>(`.ten${group}`);
    const digit2 = document.querySelector<HTMLElement>(`.${group}`);
    let num = n.toString();
    if (num.length === 1) num = '0' + num;
    const num1 = num.substr(0, 1);
    const num2 = num.substr(1, 1);

    if (digit1?.dataset['num'] !== num1) {
      if (flip) {
        flipTo(digit1!, num1);
      } else {
        jumpTo(digit1!, num1);
      }
    }
    if (digit2?.dataset['num'] !== num2) {
      if (flip) {
        flipTo(digit2!, num2);
      } else {
        jumpTo(digit2!, num2);
      }
    }
  };
  return (
    <div className='clock'>
      <Digit label='tenhour' />
      <Digit label='hour' />
      <Digit label='tenmin' />
      <Digit label='min' />
      <Digit label='tensec' />
      <Digit label='sec' />
    </div>
  );
}

interface DigitProps {
  label: string;
}

function Digit({ label }: DigitProps) {
  const [num, setNum] = useState('0');

  return (
    <div className={`digit ${label}`}>
      <span className='base'>{num}</span>
      <div className='flap over front'></div>
      <div className='flap over back'></div>
      <div className='flap under'></div>
    </div>
  );
}

export default App;
