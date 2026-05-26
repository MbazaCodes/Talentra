import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim())
      return toast.error("Please fill in all fields");
    toast.success("Thanks! We'll be in touch shortly.");
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="container mx-auto px-4 py-16 max-w-xl">
        <h1 className="font-display text-3xl font-bold">Contact us</h1>
        <p className="text-muted-foreground mt-1">
          Have a question or partnership idea? Drop us a line.
        </p>
        <Card className="p-6 mt-6">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={2000}
              />
            </div>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Send message
            </Button>
          </form>
        </Card>
      </div>
      <SiteFooter />
    </div>
  );
}
