import { Case, ApprovalStatus, ComplaintStatus } from '../types';
import { mockCases } from '../data/mockRepository';

let casesState: Case[] = [...mockCases];

export const caseService = {
  async getCases(filter?: {
    status?: ComplaintStatus | 'All';
    approval_status?: ApprovalStatus | 'All';
    severity?: string;
  }): Promise<Case[]> {
    let result = [...casesState];

    if (!filter) return result;

    if (filter.status && filter.status !== 'All') {
      result = result.filter((c) => c.complaint.status === filter.status);
    }

    if (filter.approval_status && filter.approval_status !== 'All') {
      result = result.filter((c) => c.recommendation.approval_status === filter.approval_status);
    }

    return result;
  },

  async getCaseById(caseId: string): Promise<Case | null> {
    const found = casesState.find((c) => c.case_id === caseId || c.complaint_id === caseId);
    return found || null;
  },

  async approveRecommendation(
    caseId: string,
    approverNote?: string
  ): Promise<Case | null> {
    const idx = casesState.findIndex((c) => c.case_id === caseId);
    if (idx === -1) return null;

    const target = casesState[idx];
    const updated: Case = {
      ...target,
      complaint: {
        ...target.complaint,
        status: 'Resolved',
      },
      recommendation: {
        ...target.recommendation,
        approval_status: 'Approved',
        executed: true,
        executed_action: target.recommendation.action,
        executed_at: new Date().toISOString(),
      },
      timeline: [
        ...target.timeline,
        {
          id: `t-${Date.now()}`,
          title: 'Recommendation Approved & Executed',
          description: approverNote || `Operator approved: "${target.recommendation.action}". Action executed in system.`,
          timestamp: new Date().toISOString(),
          actor: 'Human Operator',
        },
      ],
      updated_at: new Date().toISOString(),
    };

    casesState[idx] = updated;
    return updated;
  },

  async rejectRecommendation(
    caseId: string,
    rejectionReason: string
  ): Promise<Case | null> {
    const idx = casesState.findIndex((c) => c.case_id === caseId);
    if (idx === -1) return null;

    const target = casesState[idx];
    const updated: Case = {
      ...target,
      complaint: {
        ...target.complaint,
        status: 'Escalated',
      },
      recommendation: {
        ...target.recommendation,
        approval_status: 'Rejected',
        executed: false,
      },
      timeline: [
        ...target.timeline,
        {
          id: `t-${Date.now()}`,
          title: 'Recommendation Rejected by Human Operator',
          description: `Reason: ${rejectionReason}. Case routed for manual executive investigation.`,
          timestamp: new Date().toISOString(),
          actor: 'Human Operator',
        },
      ],
      updated_at: new Date().toISOString(),
    };

    casesState[idx] = updated;
    return updated;
  },

  async modifyRecommendation(
    caseId: string,
    modifiedAction: string,
    modifiedMessage: string
  ): Promise<Case | null> {
    const idx = casesState.findIndex((c) => c.case_id === caseId);
    if (idx === -1) return null;

    const target = casesState[idx];
    const updated: Case = {
      ...target,
      complaint: {
        ...target.complaint,
        status: 'Resolved',
      },
      recommendation: {
        ...target.recommendation,
        action: modifiedAction,
        customer_message: modifiedMessage,
        approval_status: 'Modified',
        executed: true,
        executed_action: modifiedAction,
        executed_at: new Date().toISOString(),
      },
      timeline: [
        ...target.timeline,
        {
          id: `t-${Date.now()}`,
          title: 'Action Modified & Dispatched',
          description: `Operator altered recommended action to: "${modifiedAction}" and dispatched customer notification.`,
          timestamp: new Date().toISOString(),
          actor: 'Human Operator',
        },
      ],
      updated_at: new Date().toISOString(),
    };

    casesState[idx] = updated;
    return updated;
  },
};
