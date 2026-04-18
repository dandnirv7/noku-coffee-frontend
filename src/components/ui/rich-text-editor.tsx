import {
  useEditor,
  EditorContent,
  type Editor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Strikethrough, List, ListOrdered } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b p-1 bg-muted/20">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Toggle bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Toggle italic"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Toggle strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <div className="w-px h-4 bg-border mx-1" />
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Toggle bullet list"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Toggle ordered list"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      CharacterCount.configure({
        limit: 2000,
      }),
      Placeholder.configure({
        placeholder: placeholder || "Cari produk...",
        emptyNodeClass: "is-editor-empty",
      }),
    ],
    content: value,
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] w-full rounded-b-md border-0 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 prose prose-sm dark:prose-invert max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html === "<p></p>") {
        onChange("");
      } else {
        onChange(html);
      }
    },
  });

  const editorState = useEditorState({
    editor,
    selector: (context) => ({
      charactersCount:
        context?.editor?.storage?.characterCount?.characters() ?? 0,
    }),
  });

  const charactersCount = editorState ? editorState.charactersCount : 0;

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  return (
    <div className="rounded-md border bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring focus-within:border-ring">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {editor && (
        <div className="flex justify-end p-2 border-t bg-muted/20 text-xs text-muted-foreground">
          {charactersCount} / 2000 karakter
        </div>
      )}
    </div>
  );
}
