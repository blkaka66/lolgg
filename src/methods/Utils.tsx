import React, { useState, useRef, useEffect } from 'react';

const ScrollableComponent = ({ children }) => {
    const containerRef = useRef(null);

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        if (containerRef.current) {
            const container = containerRef.current;//감싸고 있는 현재 컴포넌트
            const containerRect = container.getBoundingClientRect();
            const containerHeight = containerRect.bottom - containerRect.top;//컴포넌트의 현재 height
            const spaceBelow = window.innerHeight - containerRect.bottom; //현재 컴포넌트의 밑 여백
            const spaceAbove = containerRect.top;//현재 컴포넌트의 위 여백
            console.log(spaceBelow+"&&&&")
            if (spaceBelow < containerHeight) {//밑 여백이 현재 컴포넌트 height보다 작으면(컴포넌트의 밑 여백이 부족하면)
                container.style.transform = `translateY(${-spaceBelow}px)`;//위로 렌더링??이게 아닌데
            }
        }
    };

    // 스크롤 이벤트 리스너 등록
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={containerRef}>
        {children}
        </div>
);
};







const makeRandomNumber =() =>{
    const randomNum = Math.floor(Math.random() * 1000000);
    return randomNum;
}










export { makeRandomNumber ,ScrollableComponent};
