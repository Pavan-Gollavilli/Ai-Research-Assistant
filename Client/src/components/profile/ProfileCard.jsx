import { Mail, Shield, Calendar, Clock, BadgeCheck, Edit3 } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import { formatDateTime } from "../../utils/formatters";
import Badge from "../common/Badge";

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-white hover:border-slate-200 hover:shadow-sm">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
      {icon}
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-0.5 truncate font-semibold text-slate-800">
        {value}
      </p>
    </div>
  </div>
);

const ProfileCard = ({ profile, onEdit }) => {
  return (
    <Card border padding="lg" className="overflow-hidden">
      
      {/* Cover Background */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />

      <div className="relative mt-8 flex flex-col items-center sm:mt-12">
        <div className="relative">
          <img
            src={profile.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=eff6ff&color=2563eb`}
            alt={profile.name}
            className="h-28 w-28 rounded-full border-4 border-white bg-white object-cover shadow-md"
          />
          {profile.emailVerified && (
            <div className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white" title="Verified Account">
              <BadgeCheck size={14} />
            </div>
          )}
        </div>

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          {profile.name}
        </h2>
        
        <p className="text-sm font-medium text-slate-500">
          {profile.email}
        </p>

        <div className="mt-4 flex gap-2">
          <Badge color={profile.provider === "google.com" ? "indigo" : "blue"} size="sm">
            {profile.provider === "google.com" ? "Google Account" : "Email Account"}
          </Badge>
          <Badge color="emerald" size="sm" dot>Active</Badge>
        </div>

        <div className="mt-6 w-full max-w-sm sm:w-auto">
          <Button onClick={onEdit} icon={<Edit3 size={16} />} variant="outline" className="w-full sm:w-auto">
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <InfoItem
          icon={<Mail size={20} />}
          label="Email Address"
          value={profile.email}
        />
        <InfoItem
          icon={<Shield size={20} />}
          label="Auth Provider"
          value={profile.provider}
        />
        <InfoItem
          icon={<Calendar size={20} />}
          label="Member Since"
          value={formatDateTime(profile.createdAt)}
        />
        <InfoItem
          icon={<Clock size={20} />}
          label="Last Login"
          value={formatDateTime(profile.lastLogin)}
        />
      </div>

    </Card>
  );
};

export default ProfileCard;