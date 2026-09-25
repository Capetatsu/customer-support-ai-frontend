import { Complaint, ComplaintStatus, Severity, Sentiment } from '../types';
import { mockComplaints, mockCustomers, mockOrders, mockCases } from '../data/mockRepository';

// In-memory state for local interactions during user session
let complaintsState: Complaint[] = [...mockComplaints];

export const complaintService = {
  async getComplaints(filter?: {
    search?: string;
    issue_type?: string;
    severity?: Severity | 'All';
    status?: ComplaintStatus | 'All';
    sentiment?: Sentiment | 'All';
  }): Promise<Complaint[]> {
    let result = [...complaintsState];

    if (!filter) return result;

    if (filter.search && filter.search.trim()) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.complaint_id.toLowerCase().includes(q) ||
          c.text.toLowerCase().includes(q) ||
          c.customer_id.toLowerCase().includes(q) ||
          c.order_id.toLowerCase().includes(q) ||
          (c.issue_type && c.issue_type.toLowerCase().includes(q))
      );
    }

    if (filter.issue_type && filter.issue_type !== 'All') {
      result = result.filter((c) => c.issue_type === filter.issue_type);
    }

    if (filter.severity && filter.severity !== 'All') {
      result = result.filter((c) => c.severity === filter.severity);
    }

    if (filter.status && filter.status !== 'All') {
      result = result.filter((c) => c.status === filter.status);
    }

    if (filter.sentiment && filter.sentiment !== 'All') {
      result = result.filter((c) => c.sentiment === filter.sentiment);
    }

    return result;
  },

  async getComplaintById(complaintId: string): Promise<Complaint | null> {
    const found = complaintsState.find((c) => c.complaint_id === complaintId);
    return found || null;
  },

  async createComplaint(data: {
    text: string;
    customer_id: string;
    order_id: string;
    channel?: 'web' | 'email' | 'mobile' | 'whatsapp';
    attachment_url?: string;
  }): Promise<{ complaint: Complaint; case_id: string }> {
    // Normalization & Intelligence simulation (Student 2 contract)
    const lower = data.text.toLowerCase();
    let issue_type = 'Other';
    let cluster = 'General Inquiries';
    let severity: Severity = 'Low';
    let sentiment: Sentiment = 'Neutral';

    if (lower.includes('charged twice') || lower.includes('unauthorized') || lower.includes('fraud')) {
      issue_type = 'Payment Failure';
      cluster = 'Payment Problem';
      severity = 'Critical';
      sentiment = 'Negative';
    } else if (lower.includes('refund') || lower.includes('money back')) {
      issue_type = 'Refund Pending';
      cluster = 'Refund Pending';
      severity = 'High';
      sentiment = 'Negative';
    } else if (lower.includes('damaged') || lower.includes('broken') || lower.includes('cracked')) {
      issue_type = 'Damaged Product';
      cluster = 'Damaged Product';
      severity = 'High';
      sentiment = 'Negative';
    } else if (lower.includes('late') || lower.includes('not arrived') || lower.includes('tracking')) {
      issue_type = 'Late Delivery';
      cluster = 'Late Delivery';
      severity = 'Medium';
      sentiment = 'Negative';
    } else if (lower.includes('wrong') || lower.includes('mismatched') || lower.includes('different color')) {
      issue_type = 'Wrong Product';
      cluster = 'Wrong Product';
      severity = 'Medium';
      sentiment = 'Negative';
    } else if (lower.includes('thank') || lower.includes('great') || lower.includes('exceptional')) {
      issue_type = 'Product Inquiry';
      sentiment = 'Positive';
      severity = 'Low';
    }

    const newId = `C-${String(complaintsState.length + 1).padStart(3, '0')}`;
    const newCaseId = `CASE-${String(mockCases.length + 1).padStart(3, '0')}`;

    const newComplaint: Complaint = {
      complaint_id: newId,
      text: data.text,
      clean_text: data.text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(),
      customer_id: data.customer_id || 'CUST-001',
      order_id: data.order_id || 'ORD-501',
      timestamp: new Date().toISOString(),
      channel: data.channel || 'web',
      issue_type,
      sentiment,
      severity,
      cluster,
      status: severity === 'High' ? 'Investigating' : 'New',
      attachment_url: data.attachment_url,
    };

    complaintsState = [newComplaint, ...complaintsState];

    // Also auto-generate linked Case for Student 3 & Student 4 demo loop
    const matchedCustomer = mockCustomers.find((c) => c.customer_id === newComplaint.customer_id) || mockCustomers[0];
    const matchedOrder = mockOrders.find((o) => o.order_id === newComplaint.order_id) || mockOrders[0];

    mockCases.unshift({
      case_id: newCaseId,
      complaint_id: newId,
      complaint: newComplaint,
      customer: matchedCustomer,
      order: matchedOrder,
      investigation_steps: [
        { name: 'Intake & Normalization', status: 'completed' },
        { name: 'Classification & Sentiment', status: 'completed', detail: `Category: ${issue_type}` },
        { name: 'Context Retrieval', status: 'completed', detail: `Order ${matchedOrder.order_id} verified.` },
        { name: 'Policy RAG Check', status: 'completed', detail: 'Checked standard resolution guidelines.' },
        { name: 'Similar Cases', status: 'completed', detail: '3 comparable historical cases matched.' },
        { name: 'Resolution Proposal', status: 'in_progress', detail: 'Prepared action proposal.' },
      ],
      similar_cases: [
        {
          case_id: 'CASE-018',
          complaint_id: 'C-018',
          issue: `Historical inquiry on ${issue_type}`,
          outcome: 'Resolution accepted by customer',
          similarity: 0.91,
          timestamp: '2026-09-10',
        },
      ],
      recommendation: {
        complaint_id: newId,
        issue_type,
        summary: `Inquiry regarding ${issue_type} for ${matchedOrder.item}.`,
        action: issue_type === 'Damaged Product' ? 'Offer Return / Replacement' : issue_type === 'Refund Pending' ? 'Investigate Gateway Status' : 'Request Diagnostic Details',
        reason: `Based on order ${matchedOrder.order_id} status (${matchedOrder.status}) and policy rules.`,
        customer_message: `Thank you for reaching out. We have received your notice regarding order ${matchedOrder.order_id}. Our team is verifying the details right away.`,
        confidence: 0.91,
        escalation: severity === 'High' || severity === 'Critical',
        missing_information: [],
        evidence: [
          { source: 'Order Context', fact: `Order status: ${matchedOrder.status}`, verified: true },
          { source: 'Customer History', fact: `${matchedCustomer.segment} Tier customer with ${matchedCustomer.previous_orders_count} orders.`, verified: true },
        ],
        policy_ref: 'Standard_Customer_Resolution_Policy.md',
        executed: false,
        approval_status: 'Pending',
        assigned_approver: 'admin',
      },
      timeline: [
        {
          id: `t-${Date.now()}`,
          title: 'Complaint Submitted',
          description: `Customer submitted inquiry via ${newComplaint.channel}.`,
          timestamp: newComplaint.timestamp,
          actor: 'Customer',
        },
        {
          id: `t-${Date.now() + 1}`,
          title: 'Investigation Initiated',
          description: `Classified as ${issue_type} with ${severity} severity.`,
          timestamp: new Date().toISOString(),
          actor: 'Intelligence Engine',
        },
      ],
      created_at: newComplaint.timestamp,
      updated_at: newComplaint.timestamp,
    });

    return { complaint: newComplaint, case_id: newCaseId };
  },
};
