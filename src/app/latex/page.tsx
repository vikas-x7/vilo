"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LatexDoc {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    versions: { id: number; content: string; createdAt: string }[];
}

export default function LatexListPage() {
    const [docs, setDocs] = useState<LatexDoc[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const router = useRouter();

    const userId = typeof window !== "undefined"
        ? localStorage.getItem("userId") || "1"
        : "1";

    async function fetchDocs() {
        try {
            const res = await fetch("/api/latex", {
                headers: { "x-user-id": userId },
            });
            if (res.ok) {
                const data = await res.json();
                setDocs(data);
            }
        } catch (err) {
            console.error("Failed to fetch documents:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDocs();
    }, []);

    async function handleCreate() {
        if (!newTitle.trim()) return;
        setCreating(true);
        try {
            const res = await fetch("/api/latex", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-id": userId,
                },
                body: JSON.stringify({
                    title: newTitle.trim(),
                    content: "% Start writing your LaTeX here\n",
                }),
            });
            if (res.ok) {
                const doc = await res.json();
                router.push(`/latex/${doc.id}`);
            }
        } catch (err) {
            console.error("Failed to create document:", err);
        } finally {
            setCreating(false);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to delete this document?")) return;
        try {
            await fetch(`/api/latex/${id}`, {
                method: "DELETE",
                headers: { "x-user-id": userId },
            });
            setDocs((prev) => prev.filter((d) => d.id !== id));
        } catch (err) {
            console.error("Failed to delete document:", err);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>LaTeX Documents</h1>
                    <p style={styles.subtitle}>
                        Create and edit professional documents with live LaTeX preview
                    </p>
                </div>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    style={styles.createBtn}
                >
                    {showCreate ? "Cancel" : "+ New Document"}
                </button>
            </div>

            {showCreate && (
                <div style={styles.createForm}>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Document title..."
                        style={styles.input}
                        onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                        autoFocus
                    />
                    <button
                        onClick={handleCreate}
                        disabled={creating || !newTitle.trim()}
                        style={{
                            ...styles.createSubmitBtn,
                            opacity: creating || !newTitle.trim() ? 0.5 : 1,
                        }}
                    >
                        {creating ? "Creating..." : "Create"}
                    </button>
                </div>
            )}

            {loading ? (
                <div style={styles.loading}>
                    <div style={styles.spinner} />
                    <p>Loading documents...</p>
                </div>
            ) : docs.length === 0 ? (
                <div style={styles.empty}>
                    <div style={styles.emptyIcon}>📄</div>
                    <h2 style={styles.emptyTitle}>No documents yet</h2>
                    <p style={styles.emptyText}>
                        Create your first LaTeX document to get started
                    </p>
                </div>
            ) : (
                <div style={styles.grid}>
                    {docs.map((doc) => (
                        <div key={doc.id} style={styles.card}>
                            <div
                                style={styles.cardBody}
                                onClick={() => router.push(`/latex/${doc.id}`)}
                            >
                                <h3 style={styles.cardTitle}>{doc.title}</h3>
                                <p style={styles.cardMeta}>
                                    Last edited:{" "}
                                    {new Date(doc.updatedAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                                {doc.versions[0] && (
                                    <p style={styles.cardPreview}>
                                        {doc.versions[0].content.substring(0, 120)}
                                        {doc.versions[0].content.length > 120 ? "..." : ""}
                                    </p>
                                )}
                            </div>
                            <div style={styles.cardActions}>
                                <button
                                    onClick={() => router.push(`/latex/${doc.id}`)}
                                    style={styles.editBtn}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(doc.id)}
                                    style={styles.deleteBtn}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        color: "#e0e0e0",
        padding: "2rem",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
        maxWidth: "1200px",
        margin: "0 auto 2rem",
    },
    title: {
        fontSize: "2rem",
        fontWeight: 700,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        margin: 0,
    },
    subtitle: {
        color: "#888",
        marginTop: "0.25rem",
        fontSize: "0.95rem",
    },
    createBtn: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        border: "none",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.75rem",
        fontSize: "0.95rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
    },
    createForm: {
        display: "flex",
        gap: "0.75rem",
        maxWidth: "1200px",
        margin: "0 auto 2rem",
        padding: "1.25rem",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "1rem",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
    },
    input: {
        flex: 1,
        padding: "0.75rem 1rem",
        borderRadius: "0.625rem",
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.07)",
        color: "#e0e0e0",
        fontSize: "1rem",
        outline: "none",
    },
    createSubmitBtn: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        border: "none",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.625rem",
        fontSize: "0.95rem",
        fontWeight: 600,
        cursor: "pointer",
    },
    loading: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "40vh",
        gap: "1rem",
        color: "#888",
    },
    spinner: {
        width: "2.5rem",
        height: "2.5rem",
        border: "3px solid rgba(102, 126, 234, 0.2)",
        borderTopColor: "#667eea",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    },
    empty: {
        textAlign: "center" as const,
        padding: "4rem 2rem",
        maxWidth: "500px",
        margin: "0 auto",
    },
    emptyIcon: {
        fontSize: "4rem",
        marginBottom: "1rem",
    },
    emptyTitle: {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "#ccc",
        margin: "0 0 0.5rem",
    },
    emptyText: {
        color: "#888",
        fontSize: "1rem",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "1.25rem",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    card: {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1rem",
        overflow: "hidden",
        transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
        cursor: "pointer",
    },
    cardBody: {
        padding: "1.5rem",
    },
    cardTitle: {
        fontSize: "1.15rem",
        fontWeight: 600,
        color: "#e8e8f0",
        margin: "0 0 0.5rem",
    },
    cardMeta: {
        fontSize: "0.8rem",
        color: "#777",
        margin: "0 0 0.75rem",
    },
    cardPreview: {
        fontSize: "0.85rem",
        color: "#999",
        lineHeight: 1.5,
        fontFamily: "'JetBrains Mono', monospace",
        margin: 0,
        overflow: "hidden",
        whiteSpace: "pre-wrap" as const,
        wordBreak: "break-word" as const,
    },
    cardActions: {
        display: "flex",
        gap: "0.5rem",
        padding: "0 1.5rem 1.25rem",
    },
    editBtn: {
        flex: 1,
        padding: "0.5rem",
        borderRadius: "0.5rem",
        border: "1px solid rgba(102, 126, 234, 0.3)",
        background: "rgba(102, 126, 234, 0.1)",
        color: "#667eea",
        fontSize: "0.85rem",
        fontWeight: 500,
        cursor: "pointer",
    },
    deleteBtn: {
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid rgba(239, 68, 68, 0.3)",
        background: "rgba(239, 68, 68, 0.1)",
        color: "#ef4444",
        fontSize: "0.85rem",
        fontWeight: 500,
        cursor: "pointer",
    },
};
