"use client";
import React, { useEffect, useState } from "react";
import { Send, User as UserIcon, MessageSquare } from "lucide-react";
import api from "../../lib/api";
import { formatDate } from "../../lib/utils";
import toast from "react-hot-toast";

interface Comment {
  _id: string;
  author: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  resourceType: "Risk" | "Incident" | "Policy" | "Audit";
  resourceId: string;
}

export default function CommentSection({ resourceType, resourceId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await api.get("/comments", {
          params: { resourceType, resourceId }
        });
        setComments(data.data);
      } catch {
        toast.error("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [resourceType, resourceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || sending) return;

    setSending(true);
    try {
      const { data } = await api.post("/comments", {
        resourceType,
        resourceId,
        content: newComment
      });
      setComments([...comments, data.data]);
      setNewComment("");
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-8 space-y-6 pt-6 border-t" style={{ borderColor: "var(--surface-border)" }}>
      <div className="flex items-center gap-2">
        <MessageSquare size={16} style={{ color: "var(--text-muted)" }} />
        <h3 className="font-display font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider">
          Portal Discussions
        </h3>
      </div>

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="text-center py-4 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
            Loading discussion…
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-6 px-4 rounded-xl bg-[var(--surface-elevated)]" 
               style={{ border: "1px dashed var(--surface-border)" }}>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              No comments yet. Start the conversation.
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-xs"
                   style={{ background: "var(--surface-border)", color: "var(--text-primary)" }}>
                {comment.author.firstName[0]}{comment.author.lastName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    {comment.author.firstName} {comment.author.lastName}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm p-3 rounded-2xl rounded-tl-none leading-relaxed" 
                   style={{ background: "var(--surface-elevated)", color: "var(--text-secondary)", border: "1px solid var(--surface-border)" }}>
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative mt-4">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="input-field pr-12 py-3 rounded-2xl shadow-sm"
          style={{ background: "rgba(255,255,255,0.03)" }}
        />
        <button
          type="submit"
          disabled={!newComment.trim() || sending}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all hover:bg-[var(--accent-green)] group disabled:opacity-30"
          style={{ background: "transparent" }}
        >
          <Send size={18} className="group-hover:text-black" style={{ color: "var(--accent-green)" }} />
        </button>
      </form>
    </div>
  );
}
