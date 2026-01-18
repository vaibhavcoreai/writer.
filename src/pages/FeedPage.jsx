import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { db } from '../firebase';
import {
    collection,
    query,
    where,
    getDocs,
    orderBy
} from 'firebase/firestore';

const FeedPage = () => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('All');
    const [publicFeed, setPublicFeed] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const q = query(
                    collection(db, "stories"),
                    where("status", "==", "published"),
                    orderBy("updatedAt", "desc")
                );

                const querySnapshot = await getDocs(q);
                const fetchedStories = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().updatedAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || 'Just now',
                    readTime: '3 min' // You can calculate this based on content length later
                }));

                setPublicFeed(fetchedStories);
            } catch (error) {
                console.error("Error fetching feed:", error);
            } finally {
                setLoading(false);
                setLoaded(true);
            }
        };

        fetchFeed();
    }, []);

    const filteredFeed = activeTab === 'All'
        ? publicFeed
        : publicFeed.filter(item => item.type?.toLowerCase() === activeTab.toLowerCase());

    return (
        <div className="min-h-screen bg-paper text-ink selection:bg-ink-light selection:text-paper overflow-hidden relative font-sans">

            {/* Background Texture */}
            <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-0"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <NavBar loaded={loaded} />

            <main className="relative z-10 max-w-5xl mx-auto px-6 py-32 md:py-48">

                <header className={`mb-20 space-y-8 ${loaded ? 'animate-ink stagger-header' : 'opacity-0'}`}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight">The Library</h2>
                            <p className="text-ink-light font-serif italic text-xl">Discover stories that breathe in silence.</p>
                        </div>
                    </div>

                    {/* Tabs / Filters */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        {['All', 'Story', 'Poem', 'Blog'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all
                                    ${activeTab === tab
                                        ? 'bg-ink text-paper shadow-soft'
                                        : 'bg-paper-dark text-ink-lighter hover:text-ink hover:bg-white'}
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center py-40">
                        <div className="w-8 h-8 border-2 border-ink-lighter border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {filteredFeed.map((post, index) => (
                            <Link
                                to={`/read/${post.id}`}
                                key={post.id}
                                className={`group bg-paper-dark/30 hover:bg-white p-8 md:p-10 rounded-3xl border border-white/50 shadow-soft hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-[360px]
                                    ${loaded ? 'animate-reveal' : 'opacity-0'}
                                `}
                                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                            >
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-ink-lighter bg-paper/50 px-3 py-1 rounded-full border border-ink-lighter/5">
                                            {post.type || 'Story'}
                                        </span>
                                        <span className="text-ink-lighter font-serif italic text-xs">{post.readTime}</span>
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-ink mb-4 group-hover:tracking-tight transition-all duration-300">
                                        {post.title}
                                    </h3>
                                    <p className="text-ink-light font-serif italic line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="mt-8 pt-8 border-t border-ink-lighter/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center text-[10px] font-bold text-ink-light">
                                            {post.authorName?.[0]}
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-ink/70">{post.authorName}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-ink-lighter uppercase tracking-widest">{post.date}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {!loading && filteredFeed.length === 0 && (
                    <div className="text-center py-40 animate-reveal stagger-2">
                        <p className="text-ink-lighter font-serif italic">The shelves are currently empty. Perhaps you’d like to add yours?</p>
                        <Link to="/choose-type" className="mt-8 inline-block px-10 py-3 bg-ink text-paper rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl">
                            Start Writing
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default FeedPage;
