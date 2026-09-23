import React from 'react';
import { PulseMeshSimulator } from './simulators/PulseMeshSimulator';
import { VarshanetSimulator } from './simulators/VarshanetSimulator';
import { PolarisSimulator } from './simulators/PolarisSimulator';

interface ProjectSimulatorProps {
  slug: string;
}

export const ProjectSimulator: React.FC<ProjectSimulatorProps> = ({ slug }) => {
  switch (slug) {
    case 'pulsemesh':
      return <PulseMeshSimulator />;
    case 'varshanet':
      return <VarshanetSimulator />;
    case 'polaris':
      return <PolarisSimulator />;
    default:
      return null;
  }
};
