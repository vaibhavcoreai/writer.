import { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isSoft, setIsSoft] = useState(false);
    const requestRef = useRef();
    const mousePos = useRef({ x: 0, y: 0 });
    const outlinePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        const onMouseDown = () => setIsHovering(true);
        const onMouseUp = () => setIsHovering(false);

        const onMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(isClickable);
            setIsSoft(!!(target.closest('.tiptap') || target.classList.contains('tiptap')));
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseover', onMouseOver);

        const animateOutline = () => {
            const easing = 0.2;
            outlinePos.current.x += (mousePos.current.x - outlinePos.current.x) * easing;
            outlinePos.current.y += (mousePos.current.y - outlinePos.current.y) * easing;

            if (cursorOutlineRef.current) {
                cursorOutlineRef.current.style.transform = `translate3d(${outlinePos.current.x}px, ${outlinePos.current.y}px, 0)`;
            }
            requestRef.current = requestAnimationFrame(animateOutline);
        };

        requestRef.current = requestAnimationFrame(animateOutline);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseover', onMouseOver);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div className="hidden lg:block pointer-events-none fixed inset-0 z-[10001]">
            {/* 
                Center Container for the Dot 
            */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-0 h-0 transition-transform duration-0 z-[10003] pointer-events-none"
            >
                <div className="w-2 h-2 bg-ink rounded-full -mt-1 -ml-1 transition-all duration-300" />
            </div>

            {/* 
                Center Container for the Outline 
            */}
            <div
                ref={cursorOutlineRef}
                className="fixed top-0 left-0 w-0 h-0 transition-transform duration-0 z-[10002] pointer-events-none"
            >
                <div
                    className={`rounded-full border-2 transition-all duration-300 ease-out flex items-center justify-center
                        ${isPointer ? 'w-12 h-12 -mt-6 -ml-6 border-ink/40 bg-ink/[0.03]' : 'w-8 h-8 -mt-4 -ml-4 border-ink/20 bg-transparent'}
                        ${isHovering ? 'scale-[0.8]' : 'scale-100'}
                        ${isSoft ? 'opacity-5 blur-sm' : 'opacity-100 blur-0'}
                    `}
                />
            </div>

            <style>{`
                /* 
                   We hide the visual cursor, but we MUST NOT disable pointer-events on the whole page.
                   The 'pointer-events-none' is only on the custom-cursor container elements.
                */
                * {
                    cursor: none !important;
                }
                
                /* Ensure external links and buttons remain clickable despite custom cursor */
                a, button, [role="button"] {
                    pointer-events: auto !important;
                }
            `}</style>
        </div>
    );
};

export default CustomCursor;
