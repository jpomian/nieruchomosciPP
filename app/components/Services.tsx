'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/app/components/ui/card"
import { Briefcase, Users, Shield, Star, Zap, Settings, BarChart, Lock, UserPlus } from 'lucide-react'

type Role = 'Agent' | 'Pro' | 'Admin'

type RoleName = 'Agent Nieruchomości' | 'Rzeczoznawca Majątkowy' | 'Biegły Sądowy'

type ServiceInfo = {
  icon: React.ReactNode
  title: string
  description: string
}

const roleNameMapping: Record<Role, RoleName> = {
  Agent: 'Agent Nieruchomości',
  Pro: 'Rzeczoznawca Majątkowy',
  Admin: 'Biegły Sądowy',
}

const serviceData: Record<Role, ServiceInfo[]> = {
  Agent: [
    { icon: <Users className="h-6 w-6" />, title: "Connect", description: "Network with other users and share ideas." },
    { icon: <Star className="h-6 w-6" />, title: "Learn", description: "Access a wide range of learning resources." },
    { icon: <Zap className="h-6 w-6" />, title: "Create", description: "Build and showcase your own projects." },
  ],
  Pro: [
    { icon: <Briefcase className="h-6 w-6" />, title: "Collaborate", description: "Work on team projects with advanced tools." },
    { icon: <BarChart className="h-6 w-6" />, title: "Analyze", description: "Get insights with professional analytics." },
    { icon: <Lock className="h-6 w-6" />, title: "Secure", description: "Enjoy enhanced security features for your work." },
  ],
  Admin: [
    { icon: <Shield className="h-6 w-6" />, title: "Manage", description: "Oversee all aspects of the platform." },
    { icon: <Settings className="h-6 w-6" />, title: "Configure", description: "Customize settings for optimal performance." },
    { icon: <UserPlus className="h-6 w-6" />, title: "Support", description: "Provide top-tier support to all users." },
  ],
}

export default function DynamicServicesSection() {
  const [selectedRole, setSelectedRole] = useState<Role>('Agent')

  return (
    <section className="min-h-1/2 bg-background flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#f59e0b]/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-gray-600/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/2 right-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-2xl"></div>
      </div>
      <div className="max-w-4xl w-full space-y-8 relative z-10">
        <h2 className="text-3xl font-bold text-center">Zakres Usług</h2>
        <p className="text-center text-muted-foreground mb-8">
          Jako <span className="highlight">{roleNameMapping[selectedRole]}</span> mogę wykonać następujące usługi pod zlecenie:
        </p>

        <div className="space-y-6">
          {serviceData[selectedRole].map((service, index) => (
            <InfoPane
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          {(['Agent', 'Pro', 'Admin'] as Role[]).map((role) => (
            <button key={role} className='secondary-button' onClick={() => setSelectedRole(role)}>
              {roleNameMapping[role]}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function InfoPane({ icon, title, description }: ServiceInfo) {
  return (
    <Card className="w-full backdrop-blur-sm bg-background/80">
      <CardContent className="flex items-center px-10 py-8">
        <div className="bg-primary/10 p-4 rounded-full mr-6">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
