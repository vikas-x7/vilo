"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import LaTeXRenderer from "@/components/LaTeXRenderer";

interface LatexDoc {
    id: number;
    title: string;
    versions: { id: number; content: string; createdAt: string }[];
}

export default function LatexEditorPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [doc, setDoc] = useState<LatexDoc | null>(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const userId =
        typeof window !== "undefined"
            ? localStorage.getItem("userId") || "1"
            : "1";

    useEffect(() => {
        async function fetchDoc() {
            try {
                const res = await fetch(`/api/latex/${id}`, {
                    headers: { "x-user-id": userId },
                });
                if (!res.ok) throw new Error("Document not found");
                const data = await res.json();
                setDoc(data);
                setTitle(data.title);
                setContent(data.versions?.[0]?.content || "");
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchDoc();
    }, [id, userId]);

    const handleSave = useCallback(async () => {
        setSaving(true);
        setSaved(false);
        try {
            // Save content as new version
            await fetch(`/api/latex/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-id": userId,
                },
                body: JSON.stringify({ content }),
            });

            // Update title if changed
            if (doc && title !== doc.title) {
                await fetch(`/api/latex/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "x-user-id": userId,
                    },
                    body: JSON.stringify({ title }),
                });
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            console.error("Failed to save:", err);
        } finally {
            setSaving(false);
        }
    }, [content, title, id, userId, doc]);

    // Keyboard shortcut: Ctrl+S / Cmd+S
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                handleSave();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleSave]);

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner} />
                <p style={{ color: "#888" }}>Loading document...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.loadingContainer}>
                <p style={{ color: "#ef4444", fontSize: "1.2rem" }}>{error}</p>
                <button onClick={() => router.push("/latex")} style={styles.backBtn}>
                    ← Back to Documents
                </button>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Top Bar */}
            <div style={styles.topBar}>
                <button onClick={() => router.push("/latex")} style={styles.backBtn}>
                    ← Back
                </button>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.titleInput}
                    placeholder="Document title..."
                />
                <div style={styles.topBarRight}>
                    {saved && <span style={styles.savedBadge}>✓ Saved</span>}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            ...styles.saveBtn,
                            opacity: saving ? 0.6 : 1,
                        }}
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                    <span style={styles.shortcutHint}>Ctrl+S</span>
                </div>
            </div>

            {/* Editor + Preview Split */}
            <div style={styles.splitPane}>
                {/* Editor */}
                <div style={styles.pane}>
                    <div style={styles.paneHeader}>
                        <span style={styles.paneLabel}>✏️ Editor</span>
                        <span style={styles.lineCount}>
                            {content.split("\n").length} lines
                        </span>
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={styles.textarea}
                        placeholder="Write your LaTeX here...&#10;&#10;Examples:&#10;$$E = mc^2$$&#10;$\alpha + \beta = \gamma$&#10;$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$"
                        spellCheck={false}
                    />
                </div>

                {/* Divider */}
                <div style={styles.divider} />

                {/* Preview */}
                <div style={styles.pane}>
                    <div style={styles.paneHeader}>
                        <span style={styles.paneLabel}>👁️ Preview</span>
                    </div>
                    <div style={styles.previewContent}>
                        {content.trim() ? (
                            <LaTeXRenderer content={content} />
                        ) : (
                            <p style={styles.previewPlaceholder}>
                                Your rendered LaTeX will appear here...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
            "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        color: "#e0e0e0",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    loadingContainer: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
            "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        gap: "1rem",
    },
    spinner: {
        width: "2.5rem",
        height: "2.5rem",
        border: "3px solid rgba(102, 126, 234, 0.2)",
        borderTopColor: "#667eea",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    },
    topBar: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.75rem 1.5rem",
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
    },
    backBtn: {
        background: "rgba(255,255,255,0.07)",
        color: "#aaa",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        fontSize: "0.85rem",
        cursor: "pointer",
        whiteSpace: "nowrap" as const,
    },
    titleInput: {
        flex: 1,
        padding: "0.5rem 0.75rem",
        borderRadius: "0.5rem",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.05)",
        color: "#e0e0e0",
        fontSize: "1rem",
        fontWeight: 600,
        outline: "none",
    },
    topBarRight: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    },
    savedBadge: {
        color: "#4ade80",
        fontSize: "0.85rem",
        fontWeight: 500,
    },
    saveBtn: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        border: "none",
        padding: "0.5rem 1.25rem",
        borderRadius: "0.5rem",
        fontSize: "0.9rem",
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap" as const,
    },
    shortcutHint: {
        color: "#666",
        fontSize: "0.75rem",
        whiteSpace: "nowrap" as const,
    },
    splitPane: {
        flex: 1,
        display: "flex",
        overflow: "hidden",
    },
    pane: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    paneHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1rem",
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
    },
    paneLabel: {
        fontSize: "0.8rem",
        fontWeight: 600,
        color: "#888",
        textTransform: "uppercase" as const,
        letterSpacing: "0.05em",
    },
    lineCount: {
        fontSize: "0.75rem",
        color: "#555",
    },
    textarea: {
        flex: 1,
        padding: "1.25rem",
        background: "transparent",
        color: "#d4d4d8",
        border: "none",
        outline: "none",
        resize: "none" as const,
        fontSize: "0.95rem",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        lineHeight: 1.7,
        tabSize: 2,
    },
    divider: {
        width: "1px",
        background:
            "linear-gradient(180deg, rgba(102,126,234,0.3), rgba(118,75,162,0.3))",
    },
    previewContent: {
        flex: 1,
        padding: "1.25rem",
        overflow: "auto",
        fontSize: "1rem",
        lineHeight: 1.8,
    },
    previewPlaceholder: {
        color: "#555",
        fontStyle: "italic",
    },
};
