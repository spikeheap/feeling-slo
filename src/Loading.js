import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingBar from "./components/LoadingBar";

export default function Loading({ addData, currentDelay, handleIncrement }) {
    const [loading, setLoading] = useState(true);
    const [currentProgress, setCurrentProgress] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, currentDelay);
    }, [currentDelay, loading]);

    useEffect(() => {
        advanceLoadingBar();
    }, [currentProgress]);

    const advanceLoadingBar = () => {
        let stepCount = 0;
        if (stepCount >= 10) {
            return;
        }
        // this is how long each of the 10 steps is going to be...might tweak that
        // if it needs to be smoother/rougher
        const stepLength = currentDelay / 10;
        const tick = () => {
            setCurrentProgress(
                currentProgress >= 100 ? currentProgress : currentProgress + 10
            );
            stepCount += 1;
            clearInterval(stepId);
        };
        const stepId = setInterval(tick, stepLength);
    };

    const reloadOnSlow = () => {
        handleIncrement();
        addData(currentDelay, false);
        setLoading(true);
    };

    const reloadOnFast = () => {
        handleIncrement();
        addData(currentDelay, true);
        setLoading(true);
    };

    return (
        <div className="interaction">
            <h1>This is main landing page...did it load fast enough?</h1>
            <div className="loadingOutline">
                <LoadingBar currentProgress={currentProgress} />
            </div>
            {!loading && (
                <div className="buttonRow">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="too slow"
                        onClick={reloadOnSlow}
                    >
                        Too Slow
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="fast enough"
                        onClick={reloadOnFast}
                    >
                        Fast Enough
                    </motion.button>
                </div>
            )}
        </div>
    );
}
