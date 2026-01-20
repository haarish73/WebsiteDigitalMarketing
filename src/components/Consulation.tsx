import { useState } from 'react';

const steps = ['Info', 'Business', 'Budget', 'Goal'];

export default function ConsultationForm({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    goal: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const next = () => setStep((s) => Math.min(s + 1, steps.length));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitMessage('Sending...');

    try {
      const formData = new FormData();
      formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('company', form.company);
      formData.append('budget', form.budget);
      formData.append('goal', form.goal);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage('✓ Form Submitted Successfully');
        setTimeout(() => {
          onClose?.();
        }, 1500);
      } else {
        setSubmitMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setSubmitMessage('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg px-4">
      <div
        className="w-full max-w-2xl rounded-3xl p-10 relative"
        style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255,255,255,0.15)',
          boxShadow: '0 30px 80px rgba(78,205,196,0.25)',
        }}
      >
        {/* CLOSE */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white"
          >
            ✕
          </button>
        )}

        {/* TITLE */}
        <h2
          className="text-4xl font-bold text-center mb-2"
          style={{
            background:
              'linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFE66D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Free Growth Consultation
        </h2>

        <p className="text-center text-white/70 mb-8">
          Answer a few questions & we’ll call you back.
        </p>

        {/* STEP INDICATOR */}
        <div className="flex justify-center gap-2 mb-10">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-10 rounded-full transition ${
                i <= step ? 'bg-[#4ECDC4]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* STEPS */}
        {step === 0 && (
          <Step>
            <Input
              label="Your Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <Input
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
          </Step>
        )}

        {step === 1 && (
          <Step>
            <Input
              label="Company / Brand"
              value={form.company}
              onChange={(v) => setForm({ ...form, company: v })}
            />
          </Step>
        )}

        {step === 2 && (
          <Step>
            <Select
              label="Monthly Budget"
              options={[
                '$500 – $1,000',
                '$1,000 – $3,000',
                '$3,000 – $10,000',
                '$10,000+',
              ]}
              onSelect={(v) => setForm({ ...form, budget: v })}
            />
          </Step>
        )}

        {step === 3 && (
          <Step>
            <Select
              label="Primary Goal"
              options={[
                'SEO Growth',
                'Paid Ads',
                'Branding',
                'Website / Funnel',
              ]}
              onSelect={(v) => setForm({ ...form, goal: v })}
            />
          </Step>
        )}

        {step === 4 && (
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              🎉 You’re all set!
            </h3>
            <p className="text-white/70 mb-8">
              Our team will contact you within 24 hours.
            </p>

            <button 
              onClick={handleSubmit}
              disabled={submitting}
              className="px-10 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit & Get a Call Back'}
            </button>
            {submitMessage && (
              <p className="mt-4 text-white/80">{submitMessage}</p>
            )}
          </div>
        )}

        {/* NAV BUTTONS */}
        {step < 4 && (
          <div className="flex justify-between mt-10">
            {step > 0 ? (
              <button
                onClick={back}
                className="text-white/60 hover:text-white"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={next}
              className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] hover:scale-105 transition"
            >
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Step({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}

function Input({
  label,
  type = 'text',
  value,
  onChange,
}: any) {
  return (
    <div>
      <label className="text-white/80 block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-5 py-4 rounded-xl bg-white/10 text-white outline-none border border-white/20 focus:border-[#4ECDC4]"
      />
    </div>
  );
}

function Select({ label, options, onSelect }: any) {
  return (
    <div>
      <label className="text-white/80 block mb-4">{label}</label>
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt: string) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className="py-4 rounded-xl bg-white/10 text-white border border-white/20 hover:border-[#4ECDC4] hover:bg-white/20 transition"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
