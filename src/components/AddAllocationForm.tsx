import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Plus, Check, ChevronsUpDown } from "lucide-react";
import { Employee, Project } from '@/utils/mockData';
import { cn } from "@/lib/utils";

interface AddAllocationFormProps {
  employees: Employee[];
  projects: Project[];
  defaultStartDate?: string;
  defaultEndDate?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

const AddAllocationForm: React.FC<AddAllocationFormProps> = ({ 
  employees, 
  projects,
  defaultStartDate,
  defaultEndDate,
  open: controlledOpen,
  onOpenChange,
  trigger
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  const [formData, setFormData] = useState({
    employee_id: "",
    project_id: "",
    hours_allocated: "",
    start_date: null as Date | null,
    end_date: null as Date | null,
  });

  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  // Update form data when default dates change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      start_date: defaultStartDate ? parseISO(defaultStartDate) : null,
      end_date: defaultEndDate ? parseISO(defaultEndDate) : null,
    }));
  }, [defaultStartDate, defaultEndDate]);
  

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.employee_id !== "" &&
      formData.project_id !== "" &&
      formData.hours_allocated !== "" &&
      formData.start_date !== null &&
      formData.end_date !== null
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      return;
    }
    
    // Format the data as required
    const allocationData = {
      employee_id: parseInt(formData.employee_id),
      project_id: parseInt(formData.project_id),
      hours_allocated: parseInt(formData.hours_allocated),
      start_date: formData.start_date ? format(formData.start_date, 'yyyy-MM-dd') : "",
      end_date: formData.end_date ? format(formData.end_date, 'yyyy-MM-dd') : "",
    };

    setOpen(false);
    setFormData({
      employee_id: "",
      project_id: "",
      hours_allocated: "",
      start_date: null,
      end_date: null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Allocation</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new allocation for an employee.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Employee <span className="text-red-500">*</span></label>
            <Popover open={employeeOpen} onOpenChange={setEmployeeOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={employeeOpen}
                  className="w-full justify-between"
                >
                  {formData.employee_id
                    ? employees.find((employee) => employee.employee_id.toString() === formData.employee_id)?.employee_name
                    : "Select employee..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search employee..." />
                  <CommandEmpty>No employee found.</CommandEmpty>
                  <CommandGroup>
                    {employees.map((employee) => (
                      <CommandItem
                        key={employee.employee_id}
                        value={employee.employee_name}
                        onSelect={() => {
                          setFormData({ ...formData, employee_id: employee.employee_id.toString() });
                          setEmployeeOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            formData.employee_id === employee.employee_id.toString() ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {employee.employee_name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Project <span className="text-red-500">*</span></label>
            <Popover open={projectOpen} onOpenChange={setProjectOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={projectOpen}
                  className="w-full justify-between"
                >
                  {formData.project_id
                    ? projects.find((project) => project.project_id.toString() === formData.project_id)?.project_name
                    : "Select project..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search project..." />
                  <CommandEmpty>No project found.</CommandEmpty>
                  <CommandGroup>
                    {projects.map((project) => (
                      <CommandItem
                        key={project.project_id}
                        value={project.project_name}
                        onSelect={() => {
                          setFormData({ ...formData, project_id: project.project_id.toString() });
                          setProjectOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            formData.project_id === project.project_id.toString() ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {project.project_name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Hours <span className="text-red-500">*</span></label>
            <Input
              type="text"
              placeholder="Enter hours"
              value={formData.hours_allocated}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setFormData({ ...formData, hours_allocated: value });
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date <span className="text-red-500">*</span></label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.start_date ? format(formData.start_date, 'PPP') : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.start_date || undefined}
                  onSelect={(date) => setFormData({ ...formData, start_date: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">End Date <span className="text-red-500">*</span></label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.end_date ? format(formData.end_date, 'PPP') : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.end_date || undefined}
                  onSelect={(date) => setFormData({ ...formData, end_date: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700"
              disabled={!isFormValid()}
            >
              Add Allocation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAllocationForm; 