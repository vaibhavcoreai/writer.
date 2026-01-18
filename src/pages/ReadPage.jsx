import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ReadPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const docRef = doc(db, "stories", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setStory(docSnap.data());
                } else {
                    console.error("No such story!");
                    navigate('/read');
                }
            } catch (error) {
                console.error("Error fetching story:", error);
            } finally {
                setLoading(false);
                setLoaded(true);
            }
        };

        fetchStory();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-ink-lighter border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!story) return null;

    return (
        <div className="min-h-screen bg-paper text-ink selection:bg-ink-light selection:text-paper font-sans">
            <NavBar loaded={loaded} />

            <main className="max-w-3xl mx-auto px-6 py-32 md:py-48 relative z-10">
                <article className={loaded ? 'animate-ink stagger-header' : 'opacity-0'}>
                    {/* Header */}
                    <header className="mb-16 text-center">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-ink-lighter">{story.type || 'Story'}</span>
                            <span className="w-1 h-1 bg-ink-lighter/30 rounded-full"></span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-ink-lighter">3 min read</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                            {story.title}
                        </h1>

                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-ink/70">By {story.authorName}</span>
                            <span className="text-[10px] uppercase tracking-widest text-ink-lighter font-medium italic">
                                Published on {story.updatedAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                    </header>

                    {/* Content */}
                    <div className={`space-y-16 ${loaded ? 'animate-reveal stagger-body' : 'opacity-0'}`}>
                        {story.chapters?.map((chapter, index) => (
                            <section key={index} className="prose prose-lg md:prose-xl prose-ink prose-p:font-serif prose-headings:font-serif max-w-none">
                                {story.chapters.length > 1 && (
                                    <div className="mb-12 flex items-center gap-6">
                                        <span className="text-xs uppercase tracking-[0.3em] font-bold text-ink-lighter shrink-0">{chapter.title}</span>
                                        <div className="h-[1px] w-full bg-ink-lighter/10"></div>
                                    </div>
                                )}
                                {chapter.subtitle && (
                                    <h2 className="text-2xl italic text-ink-light mb-8">{chapter.subtitle}</h2>
                                )}
                                <div dangerouslySetInnerHTML={{ __html: chapter.content }} className="leading-relaxed md:leading-[1.8] text-ink/90" />
                            </section>
                        ))}
                    </div>

                    {/* Footer */}
                    <footer className="mt-32 pt-16 border-t border-ink-lighter/10 flex flex-col items-center">
                        <div className="text-center mb-12">
                            <p className="text-ink-light font-serif italic text-lg mb-8 max-w-md mx-auto leading-relaxed">
                                "Every story is a child of the heart, birthed through the ink of our experiences."
                            </p>
                            <button
                                onClick={() => navigate('/read')}
                                className="text-xs uppercase tracking-[0.3em] font-bold text-ink-lighter hover:text-ink transition-colors flex items-center gap-3 mx-auto"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
                                Back to Library
                            </button>
                        </div>
                    </footer>
                </article>
            </main>
        </div>
    );
};

export default ReadPage;
