import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@heroui/react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

const persistedKeys = [
  "instamed-review-store",
  "instamed-session-store",
  "instamed-saved-store",
  "instamed-creator-drafts",
];

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = { error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("InstaMed uncaught error", error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ error: null });
    window.location.reload();
  };

  private handleReset = () => {
    for (const key of persistedKeys) {
      window.localStorage.removeItem(key);
    }
    this.setState({ error: null });
    window.location.assign("/");
  };

  public render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-white">
        <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-soft">
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">InstaMed Recovery</p>
          <h1 className="mt-3 text-2xl font-semibold">The session crashed</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            The app caught a runtime error and stopped the broken render path. You can reload the current session or
            reset local persisted state if a cached store is corrupted.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-3 text-xs text-rose-200">
            {this.state.error.message}
          </pre>
          <div className="mt-5 flex gap-3">
            <Button className="bg-white text-black" radius="full" onPress={this.handleReload}>
              Reload
            </Button>
            <Button className="bg-white/8 text-white" radius="full" variant="flat" onPress={this.handleReset}>
              Reset Local State
            </Button>
          </div>
        </div>
      </main>
    );
  }
}
